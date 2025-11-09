package group2.backend.controller;

import group2.backend.model.Article;
import group2.backend.service.IArticleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final IArticleService service;

    public ArticleController(IArticleService service) {
        this.service = service;
    }

    @GetMapping
    public List<Article> all() {
        return service.getArticles();
    }

    @GetMapping("/{id}")
    public Article one(@PathVariable Long id) {
        return service.getArticle(id);
    }

    @PostMapping
    public Article create(@RequestBody Article article) {
        return service.addArticle(article);
    }

    @PutMapping("/{id}")
    public Article update(@PathVariable Long id, @RequestBody Article article) {
        return service.updateArticle(id, article);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteArticle(id);
    }
}
