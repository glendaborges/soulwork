package soulcode.empresa.respositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import soulcode.empresa.models.Compromisso;

public interface CompromissoRepository extends JpaRepository<Compromisso, Integer>{
	
	@Query(value = "SELECT * FROM compromisso where id_funcionario= :id_funcionario", nativeQuery = true)
	List<Compromisso> buscarFuncCompromisso(Integer id_funcionario); 
}
