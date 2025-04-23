package com.nhom678.server.utils;

import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public class ImageUtils {

    /**
     * Fetches the image from a URL and returns it as a byte array(blob).
     *
     * @param imageUrl The URL pointing to the image.
     * @return The byte array representation of the image.
     * @throws RuntimeException If the image cannot be fetched or converted.
     */
    public static byte[] fetchImageFromUrl(String imageUrl) {
        try {
            URL url = new URL(imageUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setDoInput(true);
            connection.connect();

            // Ensure we only accept successful responses (HTTP 200)
            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                return IOUtils.toByteArray(connection.getInputStream());
            } else {
                throw new IOException("Failed to fetch image from URL. HTTP status code: " + connection.getResponseCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error fetching image from URL: " + e.getMessage(), e);
        }
    }
}