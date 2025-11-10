import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Article } from '../model/article';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrl: './show-article.component.css'
})
export class ShowArticleComponent implements OnInit {
  article: Article = new Article();

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        this.articleService.getArticle(id).subscribe(data => { 
          this.article = data
        });
      }
    });
  }
}
