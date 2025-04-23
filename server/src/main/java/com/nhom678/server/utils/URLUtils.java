package com.nhom678.server.utils;

import java.net.MalformedURLException;
import java.net.URL;

public class URLUtils {
    public static boolean isValidUrl(String url) {
        try {
            new URL(url);
            return true;

        } catch (MalformedURLException e) {
            return false;
        }
    }
}
