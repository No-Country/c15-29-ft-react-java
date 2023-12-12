package com.nocountry.pets.service.impl;

import com.nocountry.pets.service.IS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class S3ServiceImpl implements IS3Service {

    private final S3Client s3Client;

    @Autowired
    public S3ServiceImpl(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadFile(byte[] image, String key) throws IOException{

        try{
//            String fileName = file();
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket("nocountry-pawfinder")
                    .key(key)
                    .build();
            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(image));
            return "File created";
        }catch(Exception e){
            throw new IOException(e.getMessage());
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
}
