package group2.backend.service;

import group2.backend.model.Dog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface IDogService {
    List<Dog> getDogs();
    Dog getDog(long id);
    Dog addDog(Dog dog);
    Dog updateDog(long id, Dog dog);
    void deleteDog(long id);
    Page<Dog> search(Specification<Dog> spec, Pageable pageable);
}
