package com.nocountry.pets.utils;


import net.coobird.thumbnailator.Thumbnailator;

import java.awt.image.BufferedImage;

public class ResizeImage {

    public static final float MAX_DIMENSION = 100;
    public ResizeImage() {
    }

    public static BufferedImage thumbnailAvatar(BufferedImage bufferedImage) {

        int imgWidth = bufferedImage.getWidth();
        int imgHeight = bufferedImage.getHeight();

        float scalingFactor = Math.min( MAX_DIMENSION / imgHeight, MAX_DIMENSION / imgWidth);
        int width = (int) (scalingFactor * imgWidth);
        int height = (int) (scalingFactor * imgHeight);

        BufferedImage file = null;
        try{
            file = Thumbnailator.createThumbnail( bufferedImage, width, height);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return file;
    }

}
