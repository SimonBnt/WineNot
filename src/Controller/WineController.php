<?php

namespace App\Controller;

use App\Entity\Country;
use App\Entity\Region;
use App\Entity\Wine;
use App\Repository\CountryRepository;
use App\Repository\RegionRepository;
use App\Repository\WineRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class WineController extends AbstractController
{
    #[Route("/wine", name: "app_wine")]
    public function index(
        WineRepository $wineRepository,
        RegionRepository $regionRepository,
        CountryRepository $countryRepository
    ): JsonResponse {
        // Récupérer toutes les entités
        $wines = $wineRepository->findAll();
        $regions = $regionRepository->findAll();
        $countries = $countryRepository->findAll();

        // Organiser les données en un format JSON
        $data = [];

        // Ajouter les vins
        foreach ($wines as $wine) {
            $data['wines'][] = [
                "id" => $wine->getId(),
                "regionId" => $wine->getRegion()->getId(),
                "region" => $wine->getRegion()->getName(),
                "title1" => $wine->getTitle1(),
                "price" => number_format($wine->getPrice(), 2, '.', ','),
                "date" => $wine->getDate(),
                "title2" => $wine->getTitle2(),
                "description" => $wine->getDescription(),
                "image" => $wine->getImage(),
            ];
        }

        // Ajouter les régions
        foreach ($regions as $region) {
            $data['regions'][] = [
                "id" => $region->getId(),
                "countryId" => $region->getCountry()->getId(),
                "country" => $region->getCountry()->getName(),
                "name" => $region->getName(),
            ];
        }

        // Ajouter les pays
        foreach ($countries as $country) {
            $data['countries'][] = [
                "id" => $country->getId(),
                "name" => $country->getName(),
            ];
        }

        // Retourner les données en format JSON
        return $this->json($data);
    }
}