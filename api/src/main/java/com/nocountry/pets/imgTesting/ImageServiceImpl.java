package com.nocountry.pets.imgTesting;
import java.io.File;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class ImageServiceImpl implements ImageService{

    @Autowired
    ImageRepository imageRepository;
    @Value("${image.storage.path}")
    private String directorioAlmacenamiento;

    @Override
    public ImageEntity saveImage(MultipartFile file) throws IOException {
        try {
            String fileName = file.getOriginalFilename();
            ImageEntity imageEntity = ImageEntity.builder()
                    .name(fileName)
                    .type(file.getContentType())
                    .uuid(UUID.randomUUID())
                    .size(file.getSize())
                    .build();
            imageEntity.setPathImage(directorioAlmacenamiento + imageEntity.getUuid().toString() + fileName);
            Path path = Path.of(imageEntity.getPathImage());
            file.transferTo(new File(imageEntity.getPathImage()));
            ImageEntity dbImgSaved = imageRepository.save(imageEntity);
            System.out.println(dbImgSaved);
            return dbImgSaved;
        }catch (IOException e){
            throw new IOException("Data was not saved", e);
        }
    }

    @Override
    public ImageEntity getById(Long id) throws NoSuchElementException {
        return imageRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Not found info with that id " + id ));
    }

}
