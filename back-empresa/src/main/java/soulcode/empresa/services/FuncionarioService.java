package soulcode.empresa.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import soulcode.empresa.models.Cargo;
import soulcode.empresa.models.Funcionario;
import soulcode.empresa.respositories.FuncionarioRepository;




@Service
public class FuncionarioService {
	
	@Autowired
	private FuncionarioRepository funcionarioRepository;
	
	@Autowired
	private CargoService cargoService;
	
//	listar todos 
	public List<Funcionario> buscarTodos(){
		return funcionarioRepository.findAll();
	}
	
//	listar um aluno
	public Funcionario buscarUmFunc(Integer id_funcionario) {
		Optional<Funcionario> funcionario = funcionarioRepository.findById(id_funcionario);
		return funcionario.orElseThrow();
	}
	
	public List<Funcionario> buscarFunCargo(Integer id_turma){
		List<Funcionario> funcionario = funcionarioRepository.fetchByCargo(id_turma);
		return funcionario;
	
	}
	
	public Funcionario buscarCpf(String func_cpf) {
		Funcionario funcionario = funcionarioRepository.fetchByCpf(func_cpf);
		return funcionario;
	}
	
//  inserir 
	public Funcionario inserirFuncionario(Integer id_cargo,Funcionario funcionario) {
		funcionario.setId_funcionario(null);
		Cargo cargo = cargoService.buscarUmCargo(id_cargo);
		funcionario.setCargo(cargo);
		return funcionarioRepository.save(funcionario);
	};
	
//	deletar
	public void deletarFuncionario(Integer id_funcionario) {
		funcionarioRepository.deleteById(id_funcionario);
	}
	
//	update

	public Funcionario editarFuncionario(Funcionario funcionario) {
		buscarUmFunc(funcionario.getId_funcionario());
		return funcionarioRepository.save(funcionario);
	}
	
//	salvar foto
	public Funcionario salvarFoto(Integer id_funcionario, String caminhoFoto) {
		Funcionario funcionario = buscarUmFunc(id_funcionario);
		funcionario.setFunc_img(caminhoFoto);
		return funcionarioRepository.save(funcionario);
	}

}
