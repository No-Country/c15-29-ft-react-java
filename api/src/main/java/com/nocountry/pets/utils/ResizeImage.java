package com.nocountry.pets.utils;


import net.coobird.thumbnailator.Thumbnailator;
import net.coobird.thumbnailator.Thumbnails;

import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ResizeImage {

    public static final float MAX_DIMENSION = 100;
    public ResizeImage() {
    }

    //    public static BufferedImage thumbnailAvatar(BufferedImage bufferedImage) {
    public static byte[] thumbnailAvatar(BufferedImage bufferedImage) {
        int imgWidth = bufferedImage.getWidth();
        int imgHeight = bufferedImage.getHeight();

        float scalingFactor = Math.min(MAX_DIMENSION / imgHeight, MAX_DIMENSION / imgWidth);
        int width = (int) (scalingFactor * imgWidth);
        int height = (int) (scalingFactor * imgHeight);
        File file = null;
        byte[] encoded = new byte[0];
        try {
            Thumbnails.of(bufferedImage)
                    .size(width, height)
                    .toFile(new File("temp.jpeg"));
            encoded = Files.readAllBytes(Paths.get("temp.jpeg"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return encoded;
    }

}
