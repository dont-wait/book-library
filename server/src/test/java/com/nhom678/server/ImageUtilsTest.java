package com.nhom678.server;

import com.nhom678.server.utils.ImageUtils;
import org.junit.jupiter.api.Test;



import static org.junit.jupiter.api.Assertions.*;

public class ImageUtilsTest {

    @Test
    public void testFetchImageFromValidUrl() {
        String validUrl = "http://books.google.com/books/content?id=ka2VUBqHiWkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";

        byte[] imageBytes = ImageUtils.fetchImageFromUrl(validUrl);
        assertNotNull(imageBytes);
        assertTrue(imageBytes.length > 0);
    }

    @Test
    public void testFetchImageFromInvalidUrl() {
        String invalidUrl = "http://invalid-url";

        Exception exception = assertThrows(RuntimeException.class, () -> {
            ImageUtils.fetchImageFromUrl(invalidUrl);
        });

        assertTrue(exception.getMessage().contains("Error fetching image from URL"));
    }
}