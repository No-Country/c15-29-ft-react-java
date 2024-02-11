package com.nocountry.pets.imgTesting;
import java.io.File;
import java.io.IOException;
import com.nocountry.pets.models.Pet;
import com.nocountry.pets.models.UserEntity;
import com.nocountry.pets.repositories.PetRepository;
import com.nocountry.pets.repositories.UserRepository;
import com.nocountry.pets.service.PetService;
import com.nocountry.pets.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.List;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    SessionService sessionService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PetService petService;

    @Autowired
    PetRepository petRepository;


    @Value("${image.storage.path}")
    private String rootDirectory;


    @Override
    public ImageEntity getById(Long id) throws NoSuchElementException {
        return imageRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Not found info with that id " + id));
    }

    public ImageEntity saveImage (MultipartFile file) {
        ImageEntity imageEntity = ImageEntity.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .uuid(UUID.randomUUID())
                .size(file.getSize())
                .build();
        imageEntity.setPathImage(imageEntity.getUuid().toString() + imageEntity.getName());

        return imageRepository.save(imageEntity);

    }
    /* ---------------------------------  USER ENDPOINTS  ---------------------------------  */
    @Override
    public String getUserImage() throws NoSuchElementException {
        System.out.println("getUserImage sucesfully");
        String urlUserImage = sessionService.getUserLogged().getImage().getPathImage();
        return urlUserImage;
    }

    public void deleteUserImageIfExists(UserEntity userLogged) throws IOException {
            ImageEntity imageToDelete = userLogged.getImage();
            if(userLogged.getImage() != null){
                Files.deleteIfExists(Paths.get(imageToDelete.getPathImage()));
                imageRepository.delete(imageToDelete);
                userLogged.setImage(null);
                userRepository.save(userLogged);
                System.out.println("deleteUserImageIfExists user have image? : " + userLogged.getImage());
            }
    }

    //permit only unique file for user replacing the last image
    @Override
    public ImageEntity saveUserImage(MultipartFile file) throws IOException {
        UserEntity userLogged = sessionService.getUserLogged();
        ImageEntity imageSaved = saveImage(file);

        //create folder
        deleteUserImageIfExists(userLogged);

        String createFolderPath = rootDirectory
                + "/usersAvatarImages/" + userLogged.getUsername() + "-idUser-" + userLogged.getId();

        String imagePath = getImagePath(imageSaved,createFolderPath);

        //asign user
        imageSaved.setUser_id(userLogged);
        imageSaved.setPathImage(imagePath);
        imageRepository.save(imageSaved);
        //asign new avatar/image
        userLogged.setImage(imageSaved);
        userRepository.save(userLogged);

        //create new image
        file.transferTo(new File(imagePath));
        return userLogged.getImage();
    }

    /* ---------------------------------  PET ENDPOINTS  ---------------------------------  */


    @Override
    public ImageEntity savePetImage(MultipartFile file, Long petId) throws IOException {

        Pet pet = petService.getPetById(petId).orElseThrow();
        ImageEntity imageSaved = saveImage(file);




        // MEJORAR
        List<ImageEntity> petImages = pet.getImagesEntity();
        if (petImages == null) {
            petImages = new ArrayList<>();
            pet.setImagesEntity(petImages);
        }

        // Init and Verify url list
        List<String> petUrls = pet.getImages();
        if (petUrls == null) {
            petUrls = new ArrayList<>();
            pet.setImages(petUrls);
        }

        //delete oldest image if is bigger than 3
        if(pet.getImagesEntity().size() >= 3){
            pet.getImagesEntity().remove(0);
            Path ImageUrlDeleted = Path.of(pet.getImages().get(0));
            Files.deleteIfExists(ImageUrlDeleted);
            pet.getImages().remove(0);
            imageRepository.delete(pet.getImagesEntity().get(0));
        }

        String createFolderPath = rootDirectory
                + "/petsImages/" + pet.getId() + "-petName-" + pet.getName();

        String imagePath = getImagePath(imageSaved,createFolderPath);
        file.transferTo(new File(imagePath));
        imageSaved.setPathImage(imagePath);

        //setPet
        petImages.add(imageSaved);
        petUrls.add(imageSaved.getPathImage());
        petRepository.save(pet);
        //setImage
        imageSaved.setPet_id(pet);
        return imageRepository.save(imageSaved);
    }


    @Override
    public List<String> getPetImages(Long petId) throws NoSuchElementException {
        Pet pet = petService.getPetById(petId).orElseThrow();
        System.out.println("getPetImages sucesfully");
        return pet.getImages();
    }


    //create folder to save image if no exist
    public String getImagePath(ImageEntity imageSaved , String createFolderPath){
        File createFolder = new File(createFolderPath);
        if(!createFolder.exists()){
            createFolder.mkdirs();
        }
        //save image file
        return createFolderPath + "/" + "id-" +imageSaved.getId() + imageSaved.getName();
    }

}
