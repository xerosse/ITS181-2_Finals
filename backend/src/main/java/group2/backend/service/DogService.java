package group2.backend.service;

import group2.backend.model.Dog;
import group2.backend.repository.DogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DogService implements IDogService{
    @Autowired
    private DogRepository repository;

    public List<Dog> getDogs() {
        return (List<Dog>) repository.findAll();
    }

    public Dog getDog(long id) {
        Optional<Dog> optional=repository.findById(id);
        if (optional.isEmpty()) {
            return null;
        }
        else {
            return (Dog) optional.get();
        }
    }

    public Dog addDog(Dog dog) {
        return repository.save(dog);
    }

    public Dog updateDog(long id, Dog dog) {
        Optional<Dog> current_data = repository.findById(id);

        if (current_data.isPresent()) {
            Dog current_dog = current_data.get();

            // overwrite data except id
            current_dog.setName(dog.getName());
            current_dog.setImage_paths(dog.getImage_paths());
            current_dog.setAge(dog.getAge());
            current_dog.setSex(dog.getSex());
            current_dog.setBreed(dog.getBreed());
            current_dog.setSize(dog.getSize());
            current_dog.setWeight(dog.getWeight());
            current_dog.setStatus(dog.getStatus());
            current_dog.setArrived_date(dog.getArrived_date());
            current_dog.setAdopted_date(dog.getAdopted_date());
            current_dog.setDescription(dog.getDescription());

            return repository.save(current_dog);
        }
        else {
            return null;
        }
    }

    public void deleteDog(long id) {
        Optional<Dog> dog = repository.findById(id);
        if (dog.isPresent()) {
            repository.delete(dog.get());
        }

    }

    @Override
    public Page<Dog> search(Specification<Dog> spec, Pageable pageable) {
        return repository.findAll(spec, pageable);
    }


}
