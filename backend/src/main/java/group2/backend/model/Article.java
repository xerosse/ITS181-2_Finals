package group2.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    // store just date (no time) adjust to LocalDateTime if we need time
    private LocalDate date;

    // single image path or url
    @Column(name = "image_path", length = 500)
    private String image_path;

    @Lob
    @Column(nullable = false)
    private String content;

    // constructors
    public Article() {
    }

    public Article(String title, LocalDate date, String image_path, String content) {
        this.title = title;
        this.date = date;
        this.image_path = image_path;
        this.content = content;
    }

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getImage_path() {
        return image_path;
    }

    public void setImage_path(String image_path) {
        this.image_path = image_path;
    }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
