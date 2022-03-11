package soulcode.empresa.respositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import soulcode.empresa.models.Funcionario;



public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> {
	
	@Query(value = "SELECT * FROM funcionario WHERE id_cargo = :id_cargo", nativeQuery = true)
	List<Funcionario> fetchByCargo(Integer id_cargo);
	
	@Query(value = "SELECT * FROM funcionario WHERE func_cpf = :func_cpf", nativeQuery = true)
	Funcionario fetchByCpf(String func_cpf);
	
	

}