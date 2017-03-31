/*
 * This file is part of the LIRE project: http://lire-project.net
 * LIRE is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * LIRE is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with LIRE; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 * We kindly ask you to refer the any or one of the following publications in
 * any publication mentioning or employing Lire:
 *
 * Lux Mathias, Savvas A. Chatzichristofis. Lire: Lucene Image Retrieval –
 * An Extensible Java CBIR Library. In proceedings of the 16th ACM International
 * Conference on Multimedia, pp. 1085-1088, Vancouver, Canada, 2008
 * URL: http://doi.acm.org/10.1145/1459359.1459577
 *
 * Lux Mathias. Content Based Image Retrieval with LIRE. In proceedings of the
 * 19th ACM International Conference on Multimedia, pp. 735-738, Scottsdale,
 * Arizona, USA, 2011
 * URL: http://dl.acm.org/citation.cfm?id=2072432
 *
 * Mathias Lux, Oge Marques. Visual Information Retrieval using Java and LIRE
 * Morgan & Claypool, 2013
 * URL: http://www.morganclaypool.com/doi/abs/10.2200/S00468ED1V01Y201301ICR025
 *
 * Copyright statement:
 * --------------------
 * (c) 2002-2013 by Mathias Lux (mathias@juggle.at)
 *     http://www.semanticmetadata.net/lire, http://www.lire-project.net
 */

package net.semanticmetadata.lire.sampleapp;

import com.mongodb.MongoClientURI;
import net.semanticmetadata.lire.builders.DocumentBuilder;
import net.semanticmetadata.lire.imageanalysis.features.global.CEDD;
import net.semanticmetadata.lire.searchers.GenericFastImageSearcher;
import net.semanticmetadata.lire.searchers.ImageSearchHits;
import net.semanticmetadata.lire.searchers.ImageSearcher;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.store.FSDirectory;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import static com.mongodb.client.model.Filters.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Searcher {
    public static void main(String[] args) throws IOException {
        // Checking if the cropped version of the query image exists
        BufferedImage croppedQueryImage = null;
        boolean croppedQueryImageExists = false;
        // Get the path to the cropped version of the query image from MongoDB
        MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://meteor:PasswordForMeteor@cluster1-shard-00-00-dmovm.mongodb.net:27017,cluster1-shard-00-01-dmovm.mongodb.net:27017,cluster1-shard-00-02-dmovm.mongodb.net:27017/test?ssl=true&replicaSet=Cluster1-shard-0&authSource=admin"));
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> queriesCollection = database.getCollection("queries");
        String queryId = args[0];
        Document queryDocument = queriesCollection.find(eq("_id", queryId)).first();
        System.out.println(queryDocument);
        String queryImagePath = queryDocument.getString("imagePath");
        String croppedQueryImagePath = "../app/public" + queryImagePath.substring(0, queryImagePath.length() - 4) + "_CROPPED.png"; // - 4 because length of ".png" is 4

        File f = new File(croppedQueryImagePath);
        if (f.exists()) {
            try {
                croppedQueryImage = ImageIO.read(f);
                croppedQueryImageExists = true;
            } catch (IOException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
        }

        if (!croppedQueryImageExists) {
            String errorMessage = "Error getting the query image";
            queriesCollection.updateOne(eq("_id", queryId), new Document("$set", new Document("error", errorMessage)));
            System.out.println(errorMessage);
            System.exit(1);
        }

        IndexReader ir = DirectoryReader.open(FSDirectory.open(Paths.get("../indexes/t-shirts/index")));
        ImageSearcher searcher = new GenericFastImageSearcher(30, CEDD.class);

        ImageSearchHits hits = searcher.search(croppedQueryImage, ir);
        List<String> results = new ArrayList<>();
        for (int i = 0; i < hits.length(); i++) {
            String imageId = ir.document(hits.documentID(i)).getValues(DocumentBuilder.FIELD_NAME_IDENTIFIER)[0];
            results.add(imageId);
        }

        queriesCollection.updateOne(eq("_id", queryId), new Document("$set", new Document("results", results)));
    }
}
