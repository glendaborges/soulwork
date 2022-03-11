package soulcode.empresa.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import soulcode.empresa.models.Cargo;
import soulcode.empresa.respositories.CargoRepository;
import soulcode.empresa.services.exceptions.ObjectNotFoundException;


@Service
public class CargoService {
	
	@Autowired
	CargoRepository cargoRepository;
	
	public List<Cargo> buscarTodosCargos(){
		return cargoRepository.findAll();
	}
	
	public Cargo buscarUmCargo(Integer id_cargo) {
		Optional<Cargo> cargo = cargoRepository.findById(id_cargo);
		return cargo.orElseThrow(
				()-> new ObjectNotFoundException("Cargo não encontrado!"));
	}
	
	public Cargo inserirCargo(Cargo cargo) {
		cargo.setId_cargo(null);
		return cargoRepository.save(cargo);
	}
	
	public Cargo editarCargo(Cargo cargo) {
		buscarUmCargo(cargo.getId_cargo());
		return cargoRepository.save(cargo);
	}
	
	public void deletarCargo(Integer id_cargo) {
		try {
		cargoRepository.deleteById(id_cargo);	
		} catch(DataIntegrityViolationException e) {
			throw new soulcode.empresa.services.exceptions.DataIntegrityViolationException("Não foi possível excluir esse cargo, pois existem funionários relacionados.");
		}
		
	}

}
