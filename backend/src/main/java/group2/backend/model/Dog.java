package group2.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name="dogs")
public class Dog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    // store list in a separate table: dog_pictures
    @ElementCollection
    @CollectionTable(name = "dog_pictures", joinColumns = @JoinColumn(name = "dog_id"))
    @Column(name = "file_path")
    private List<String> image_paths;

    private double age;
    @Enumerated(EnumType.STRING)
    private Sex sex;
    private String breed;
    @Enumerated(EnumType.STRING)
    private Size size;
    private double weight;
    @Enumerated(EnumType.STRING)
    private Status status;
    private LocalDate arrived_date;
    private LocalDate adopted_date;
    private String description;

    // TODO: Expand Enums if we need it :P
    public static enum Sex {
        M,
        F
    }

    public static enum Size {
        SMALL,
        MEDIUM,
        LARGE
    }

    public static enum Status {
        ADOPTED,
        AVAILABLE
    }

    public Dog(){}

    public Dog(String name, List<String> image_paths, double age, Sex sex, String breed, Size size, double weight, Status status, LocalDate arrived_date, String description) {
        this.name = name;
        this.image_paths = image_paths;
        this.age = age;
        this.sex = sex;
        this.breed = breed;
        this.size = size;
        this.weight = weight;
        this.status = status;
        this.arrived_date = arrived_date;
        this.description = description;
    }

    // getters setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getImage_paths() {
        return image_paths;
    }

    public void setImage_paths(List<String> image_paths) {
        this.image_paths = image_paths;
    }

    public double getAge() {
        return age;
    }

    public void setAge(double age) {
        this.age = age;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public Size getSize() {
        return size;
    }

    public void setSize(Size size) {
        this.size = size;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDate getArrived_date() {
        return arrived_date;
    }

    public void setArrived_date(LocalDate arrived_date) {
        this.arrived_date = arrived_date;
    }

    public LocalDate getAdopted_date() {
        return adopted_date;
    }

    public void setAdopted_date(LocalDate adopted_date) {
        this.adopted_date = adopted_date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 79 * hash + Objects.hashCode(this.id);
        hash = 79 * hash + Objects.hashCode(this.name);
        hash = 79 * hash + Objects.hashCode(this.image_paths);
        hash = 79 * hash + Objects.hashCode(this.age);
        hash = 79 * hash + Objects.hashCode(this.sex);
        hash = 79 * hash + Objects.hashCode(this.breed);
        hash = 79 * hash + Objects.hashCode(this.size);
        hash = 79 * hash + Objects.hashCode(this.weight);
        hash = 79 * hash + Objects.hashCode(this.status);
        hash = 79 * hash + Objects.hashCode(this.arrived_date);
        hash = 79 * hash + Objects.hashCode(this.adopted_date);
        hash = 79 * hash + Objects.hashCode(this.description);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Dog other = (Dog) obj;
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (!Objects.equals(this.image_paths, other.image_paths)) {
            return false;
        }
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Dog{");
        sb.append("id=").append(id);
        sb.append(", name='").append(name).append('\'');
        sb.append(", image_paths='").append(image_paths).append('\'');
        sb.append(", age='").append(age).append('\'');
        sb.append(", sex='").append(sex).append('\'');
        sb.append(", breed='").append(breed).append('\'');
        sb.append(", size='").append(size).append('\'');
        sb.append(", weight='").append(weight).append('\'');
        sb.append(", status='").append(status).append('\'');
        sb.append(", arrived_date='").append(arrived_date).append('\'');
        sb.append(", adopted_date='").append(adopted_date).append('\'');
        sb.append(", description=").append(description);
        sb.append('}');
        return sb.toString();
    }

}
