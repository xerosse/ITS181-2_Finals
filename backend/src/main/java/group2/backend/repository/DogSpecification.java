package group2.backend.repository;

import group2.backend.model.Dog;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class DogSpecification {

    public static Specification<Dog> withNameLike(String name) {
        return (root, query, cb) -> {
            if (name == null || name.isEmpty()) return null;
            return cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
        };
    }

    public static Specification<Dog> withBreedLike(String breed) {
        return (root, query, cb) -> {
            if (breed == null || breed.isEmpty()) return null;
            return cb.like(cb.lower(root.get("breed")), "%" + breed.toLowerCase() + "%");
        };
    }

    public static Specification<Dog> withSex(String sex) {
        return (root, query, cb) -> {
            if (sex == null || sex.isEmpty()) return null;
            return cb.equal(root.get("sex"), Enum.valueOf(group2.backend.model.Dog.Sex.class, sex.toUpperCase()));
        };
    }

    public static Specification<Dog> withSize(String size) {
        return (root, query, cb) -> {
            if (size == null || size.isEmpty()) return null;
            return cb.equal(root.get("size"), Enum.valueOf(group2.backend.model.Dog.Size.class, size.toUpperCase()));
        };
    }

    public static Specification<Dog> withStatus(String status) {
        return (root, query, cb) -> {
            if (status == null || status.isEmpty()) return null;
            return cb.equal(root.get("status"), Enum.valueOf(group2.backend.model.Dog.Status.class, status.toUpperCase()));
        };
    }

    public static Specification<Dog> withAgeBetween(Double minAge, Double maxAge) {
        return (root, query, cb) -> {
            if (minAge == null && maxAge == null) return null;
            if (minAge != null && maxAge != null) return cb.between(root.get("age"), minAge, maxAge);
            if (minAge != null) return cb.greaterThanOrEqualTo(root.get("age"), minAge);
            return cb.lessThanOrEqualTo(root.get("age"), maxAge);
        };
    }

    public static Specification<Dog> withArrivedDateBetween(LocalDate from, LocalDate to) {
        return (root, query, cb) -> {
            if (from == null && to == null) return null;
            if (from != null && to != null) return cb.between(root.get("arrived_date"), from, to);
            if (from != null) return cb.greaterThanOrEqualTo(root.get("arrived_date"), from);
            return cb.lessThanOrEqualTo(root.get("arrived_date"), to);
        };
    }
}