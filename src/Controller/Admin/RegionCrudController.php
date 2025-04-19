<?php

namespace App\Controller\Admin;

use App\Entity\Region;
use App\Entity\Country;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;

class RegionCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Region::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            AssociationField::new("country")
                ->setLabel("Pays")
                ->formatValue(function ($value, $entity) {
                    return $value ? $value->getName() : "";
                }),
            TextField::new("name")
                ->setLabel("Nom")
        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular("Région")
            ->setEntityLabelInPlural("Régions")
            ->setPageTitle(Crud::PAGE_INDEX, "Liste des Régions")
            ->setPageTitle(Crud::PAGE_NEW, "Créer une Région")
            ->setPageTitle(Crud::PAGE_EDIT, "Modifier la Région")
            ->setPageTitle(Crud::PAGE_DETAIL, "Détails de la Région");
    }
}
