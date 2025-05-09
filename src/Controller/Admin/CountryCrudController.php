<?php

namespace App\Controller\Admin;

use App\Entity\Country;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;

class CountryCrudController extends AbstractCrudController
{

    use Trait\ReadOnlyTrait;

    public static function getEntityFqcn(): string
    {
        return Country::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new("id"),
            TextField::new("name")
                ->setLabel("Nom"),
        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular("Pay")
            ->setEntityLabelInPlural("Pays")
            ->setPageTitle(Crud::PAGE_INDEX, "Liste des Pays");
    }
}
