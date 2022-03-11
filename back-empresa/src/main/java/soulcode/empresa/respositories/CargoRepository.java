package soulcode.empresa.respositories;

import org.springframework.data.jpa.repository.JpaRepository;

import soulcode.empresa.models.Cargo;



public interface CargoRepository extends JpaRepository<Cargo,Integer> {

}
