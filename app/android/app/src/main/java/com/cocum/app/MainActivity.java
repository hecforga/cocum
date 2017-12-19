package com.cocum.app;

import android.os.Bundle;

import com.facebook.react.ReactPackage;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.cocum.app.generated.ExponentBuildConstants;
import host.exp.expoview.ExponentActivity;

public class MainActivity extends ExponentActivity {

  @Override
  public String publishedUrl() {
    return "https://exp.host/@hecforga/Cocum";
  }

  @Override
  public String developmentUrl() {
    String angel = "expa9f81069b8f942429303cbbafaa7e301://3n-zcc.hecforga.app.exp.direct:80";
    String hector = "expa9f81069b8f942429303cbbafaa7e301://3n-zcd.hecforga.app.exp.direct:80";
    return hector;
  }

  @Override
  public List<String> sdkVersions() {
    return new ArrayList<>(Arrays.asList("20.0.0"));
  }

  @Override
  public List<ReactPackage> reactPackages() {
    return ((MainApplication) getApplication()).getPackages();
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @Override
  public Bundle initialProps(Bundle expBundle) {
    // Add extra initialProps here
    return expBundle;
  }
}
