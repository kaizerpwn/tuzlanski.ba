<?php

class Article
{
    private $id;
    private $title;
    private $image;
    private $source_link;
    private $categories;
    private $short_description;
    private $description;
    private $keywords;
    private $author;
    private $language;

    public function getId()
    {
        return $this->id;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function getImage()
    {
        return $this->image;
    }

    public function getSourceLink()
    {
        return $this->source_link;
    }

    public function getCategories()
    {
        return $this->categories;
    }

    public function getShortDescription()
    {
        return $this->short_description;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function getKeywords()
    {
        return $this->keywords;
    }

    public function getAuthor()
    {
        return $this->author;
    }

    public function getLanguage()
    {
        return $this->language;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function setImage($image)
    {
        $this->image = $image;
    }

    public function setSourceLink($source_link)
    {
        $this->source_link = $source_link;
    }

    public function setCategories($categories)
    {
        $this->categories = $categories;
    }

    public function setShortDescription($short_description)
    {
        $this->short_description = $short_description;
    }

    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function setKeywords($keywords)
    {
        $this->keywords = $keywords;
    }

    public function setAuthor($author)
    {
        $this->author = $author;
    }

    public function setLanguage($language)
    {
        $this->language = $language;
    }
}
