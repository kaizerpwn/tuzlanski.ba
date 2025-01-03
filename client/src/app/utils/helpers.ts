import { Article } from '../models/Article';

export const findMostUsedSubCategories = (articles: Article[]): string[] => {
  if (!articles || articles.length === 0) {
    return [];
  }

  const subCategories = articles.reduce((acc, article) => {
    let parsedSubCategoriesJSON: string[] = [];
    try {
      parsedSubCategoriesJSON = JSON.parse(article.getSubCategories() || '[]');
    } catch (error) {
      console.error('Error parsing sub-categories JSON:', error);
    }

    parsedSubCategoriesJSON.forEach((subCategory: string) => {
      const trimmedSubCategory = decodeURIComponent(subCategory.trim());
      if (trimmedSubCategory && trimmedSubCategory.split(' ').length === 1) {
        acc[trimmedSubCategory] = acc[trimmedSubCategory]
          ? acc[trimmedSubCategory] + 1
          : 1;
      }
    });
    return acc;
  }, {} as { [key: string]: number });

  return Object.entries(subCategories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([subCategory]) => subCategory);
};
