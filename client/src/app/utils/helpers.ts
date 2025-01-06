import { Article } from '../models/Article';
import { CATEGORIES } from './constants';

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

export const formatTimeAgo = (dateString: string): string => {
  const publishedDate = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - publishedDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return `Prije ${diffInSeconds} sekundi`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `Prije ${minutes} minuta`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `Prije ${hours} sati`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `Prije ${days} dana`;
  }
};

export const exportFirstSubCategory = (subCategories: string): string => {
  try {
    const parsedSubCategoriesJSON = JSON.parse(subCategories || '[]');
    return decodeURIComponent(parsedSubCategoriesJSON[0]);
  } catch (error) {
    console.error('Error parsing sub-categories JSON:', error);
    return '';
  }
};

export const findColorForCategory = (name: string): string => {
  const category = CATEGORIES.find((category) => category.name === name);
  return category ? category.color : '';
};

export const findBackgroundColorForCategory = (name: string): string => {
  const category = CATEGORIES.find((category) => category.name === name);
  return category ? category.backgroundColor : '';
};
