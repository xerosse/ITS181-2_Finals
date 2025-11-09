package group2.backend.service;

import group2.backend.model.Article;
import java.util.List;

public interface IArticleService {
    List<Article> getArticles();
    Article getArticle(Long id);
    Article addArticle(Article article);
    Article updateArticle(Long id, Article article);
    void deleteArticle(Long id);
}
