package soulcode.empresa.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import soulcode.empresa.models.Compromisso;
import soulcode.empresa.models.Funcionario;
import soulcode.empresa.models.StatusServico;
import soulcode.empresa.respositories.CompromissoRepository;


@Service
public class CompromissoService {
	
	@Autowired
	private CompromissoRepository compromissoRepository;
	
	@Autowired
	private FuncionarioService funcionarioService;
	
	
	public Compromisso buscarUmCompromisso(Integer id_compromisso) {
		 Optional<Compromisso> compromisso = compromissoRepository.findById(id_compromisso);
		return compromisso.orElseThrow();
	}
	
	public List<Compromisso> buscarCompromissoFun(Integer id_funcionario){
		List<Compromisso> compromisso = compromissoRepository.buscarFuncCompromisso(id_funcionario);
		return compromisso;
	}
	
	public Compromisso cadastrarCompromisso(Compromisso compromisso, Integer id_funcionario) {
		compromisso.setId_compromisso(null);
		Funcionario funcionario = funcionarioService.buscarUmFunc(id_funcionario);
		compromisso.setFuncionario(funcionario);
		return compromissoRepository.save(compromisso);
	}
	
	public Compromisso editarCompromissso(Compromisso compromisso, Integer id_compromisso, Integer id_funcionario) {
		buscarUmCompromisso(id_compromisso);
		Funcionario funcionario = funcionarioService.buscarUmFunc(id_funcionario);
		compromisso.setFuncionario(funcionario);
		return compromissoRepository.save(compromisso);
	}
	
	public Compromisso concluirCompromisso(Integer id_compromisso) {
		Compromisso compromisso = buscarUmCompromisso(id_compromisso);
		StatusServico status = StatusServico.CONCLUIDO;
		compromisso.setCon_status(status);
		return compromissoRepository.save(compromisso);
	}
	public Compromisso cancelarCompromisso(Integer id_compromisso) {
		Compromisso compromisso = buscarUmCompromisso(id_compromisso);
		StatusServico status = StatusServico.CANCELADO;
		compromisso.setCon_status(status);
		return compromissoRepository.save(compromisso);
	}
	
	


}
