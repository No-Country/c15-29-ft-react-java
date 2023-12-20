package com.nocountry.pets.service.impl;

import com.nocountry.pets.service.IS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class S3ServiceImpl implements IS3Service {

    private final S3Client s3Client;

    @Autowired
    public S3ServiceImpl(S3Client s3Client) {
        this.s3Client = s3Client;
    }


    public boolean uploadFile(byte[] image, String key) throws IOException {
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket("nocountry-pawfinder")
                    .key(key)
                    .build();

            PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromBytes(image));

            // Check if the HTTP response code indicates success
            int statusCode = response.sdkHttpResponse().statusCode();
            if (statusCode >= 200 && statusCode < 300) {
                return true; // Successful upload
            } else {
                throw new IOException("Error uploading file. HTTP status code: " + statusCode);
            }
        } catch (S3Exception e) {
            // Handle specific Amazon S3 exceptions
            throw new IOException("S3 Exception: " + e.getMessage(), e);
        } catch (Exception e) {
            // Handle other exceptions
            throw new IOException("Error uploading file: " + e.getMessage(), e);
        }
    }

    public byte[] getObject(String bucketName, String key){
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket("nocountry-pawfinder")
                .key(key)
                .build();
        ResponseInputStream<GetObjectResponse> res = s3Client.getObject(getObjectRequest);
        try{
            return res.readAllBytes();
        } catch (IOException e){
            throw new RuntimeException(e);
        }
    }

    public List<String> uploadMultipleObjects(List<byte[]> data, Long id)  {
        List<String> keyImages = new ArrayList<>();
        for( byte[] object : data){
            UUID uuid = UUID.randomUUID();
            String uuidString = uuid.toString();
            String keyPath = String.format("%d/images/%s", id, uuidString);
            keyImages.add(keyPath);
            try{
                uploadFile(object,keyPath);
            }catch (Exception e){
                System.out.println("Error uploading the file " + e.getMessage());
            }
        }
        return keyImages;
    }

    public void deleteObject(String bucketName, String key){
        try{
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket("nocountry-pawfinder")
                    .key(key)
                    .build();
            s3Client.deleteObject(deleteObjectRequest);
        }catch (S3Exception e){
            throw new RuntimeException("Error deleting object from S3: " + e.getMessage(), e);
        }
    }

    public ListObjectsV2Response getAllImagesOfEntity(String entityRoot){
        ListObjectsV2Request listObjectsRequest = ListObjectsV2Request.builder()
                .bucket("nocountry-pawfinder")
                .prefix(entityRoot + "/")
                .build();

        return s3Client.listObjectsV2(listObjectsRequest);
    }

    public void deleteMultiplesFiles(String entityRoot){
        ListObjectsV2Response allImages = getAllImagesOfEntity(entityRoot);
        for(S3Object object : allImages.contents()){
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket("nocountry-pawfinder")
                    .key(object.key())
                    .build();

            s3Client.deleteObject(deleteObjectRequest);
            System.out.println("Deleted object " + object.key());
        }
    }
}
