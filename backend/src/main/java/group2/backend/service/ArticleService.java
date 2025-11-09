package group2.backend.service;

import group2.backend.model.Article;
import group2.backend.repository.ArticleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService implements IArticleService {
    private final ArticleRepository repo;

    public ArticleService(ArticleRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Article> getArticles() {
        return repo.findAll();
    }

    @Override
    public Article getArticle(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Article addArticle(Article article) {
        return repo.save(article);
    }

    @Override
    public Article updateArticle(Long id, Article article) {
        article.setId(id);
        return repo.save(article);
    }

    @Override
    public void deleteArticle(Long id) {
        repo.deleteById(id);
    }
}
