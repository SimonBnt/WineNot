<?php

namespace App\Controller\Admin;

use App\Entity\Wine;
use App\Entity\Region;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use App\Service\FileUploader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Doctrine\ORM\EntityManagerInterface;

class WineCrudController extends AbstractCrudController
{
    private $fileUploader;

    public function __construct(FileUploader $fileUploader)
    {
        $this->fileUploader = $fileUploader;
    }

    public static function getEntityFqcn(): string
    {
        return Wine::class;
    }
    
    public function configureFields(string $pageName): iterable
    {
        return [
            AssociationField::new("region")
                ->setLabel("Région")
                ->formatValue(function ($value, $entity) {
                    return $value ? $value->getName() : "";
                }),
            TextField::new("title1")
                ->setLabel("Titre 1"),
            MoneyField::new("price")
                ->setCurrency("EUR")
                ->setLabel("Prix")
                ->setStoredAsCents(false),
            IntegerField::new("date")
                ->setLabel("Date"),
            TextField::new("title2")
                ->setLabel("Titre 2"),
            TextField::new("description")
                ->setLabel("Description"),
            ImageField::new("image")
                ->setUploadDir("public/assets/upload/wineImg")
                ->setBasePath("assets/upload/wineImg")
                ->setUploadedFileNamePattern('[randomhash].[extension]')
                ->setLabel("Image")
        ];
    }

    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if ($entityInstance instanceof Wine) {
            $file = $entityInstance->getImage();

            if ($file instanceof UploadedFile) {
                $fileName = $this->fileUploader->upload($file);
                $entityInstance->setImage($fileName);
            }
        }

        parent::persistEntity($entityManager, $entityInstance);
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular("Vin")
            ->setEntityLabelInPlural("Vins")
            ->setPageTitle(Crud::PAGE_INDEX, "Liste des Vins")
            ->setPageTitle(Crud::PAGE_NEW, "Créer un Vin")
            ->setPageTitle(Crud::PAGE_EDIT, "Modifier le Vin")
            ->setPageTitle(Crud::PAGE_DETAIL, "Détails du Vin");
    }
}
