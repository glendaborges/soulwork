package soulcode.empresa.respositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import soulcode.empresa.models.Endereco;

public interface EnderecoRepository  extends JpaRepository<Endereco, Integer>{
	
	@Query(value = "SELECT * FROM endereco WHERE id_funcionario = :id_funcionario ", nativeQuery = true)
	Endereco buscarFuncEndereco(Integer id_funcionario);

}
