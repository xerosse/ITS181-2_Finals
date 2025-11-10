package group2.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.*;

// This class will be used for Application forms I assume
@Entity
@Table(name="applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "dog_id")
    private Dog dog;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Account user;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDate application_date;

    public static enum Status {
        ONGOING,
        COMPLETE,
        CANCELLED
    };

    public Application(){}

    public Application(Dog dog, Account user, Status status, LocalDate application_date) {
        this.user = user;
        this.dog = dog;
        this.status = status;
        this.application_date = application_date;
    }

    // getters setters


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Dog getDog() {
        return dog;
    }

    public void setDog(Dog dog) {
        this.dog = dog;
    }

    public Account getUser() {
        return user;
    }

    public void setUser(Account user) {
        this.user = user;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDate getApplication_date() {
        return application_date;
    }

    public void setApplication_date(LocalDate application_date) {
        this.application_date = application_date;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 79 * hash + Objects.hashCode(this.id);
        hash = 79 * hash + Objects.hashCode(this.dog);
        hash = 79 * hash + Objects.hashCode(this.user);
        hash = 79 * hash + Objects.hashCode(this.status);
        hash = 79 * hash + Objects.hashCode(this.application_date);
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
        final Application other = (Application) obj;
        if (!Objects.equals(this.dog, other.dog)) {
            return false;
        }
        if (!Objects.equals(this.user, other.user)) {
            return false;
        }
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Application{");
        sb.append("id=").append(id);
        sb.append(", dog='").append(dog).append('\'');
        sb.append(", user='").append(user).append('\'');
        sb.append(", status='").append(status).append('\'');
        sb.append(", application_date='").append(application_date);
        sb.append('}');
        return sb.toString();
    }

}
