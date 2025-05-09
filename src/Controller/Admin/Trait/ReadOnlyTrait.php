<?php

namespace App\Controller\Admin\Trait;

use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;

trait ReadOnlyTrait
{
    public function configureActions(Actions $actions): Actions
    {
        $actions
            ->disable(Action::NEW, Action::DELETE, Action::EDIT);

            return $actions;
    }
}