package soulcode.empresa.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import soulcode.empresa.models.Compromisso;

import soulcode.empresa.services.CompromissoService;

@CrossOrigin
@RestController
@RequestMapping("empresa")
public class CompromissoController {

	@Autowired
	private CompromissoService compromissoService;

	@GetMapping("/compromisso/{id_compromisso}")
	public ResponseEntity<Compromisso> listarUmCompromisso(@PathVariable Integer id_compromisso) {
		Compromisso compromisso = compromissoService.buscarUmCompromisso(id_compromisso);
		return ResponseEntity.ok().body(compromisso);
	}

	@GetMapping("/compromisso-func/{id_funcionario}")
	public List<Compromisso> listarFuncCompromisso(@PathVariable Integer id_funcionario) {
		List<Compromisso> compromisso = compromissoService.buscarCompromissoFun(id_funcionario);
		return compromisso;
	}

	@PostMapping("/funcionario/compromisso/{id_funcionario}")
	public ResponseEntity<Compromisso> cadastrarCompromisso(@RequestBody Compromisso compromisso,
			@PathVariable Integer id_funcionario) {
		compromisso = compromissoService.cadastrarCompromisso(compromisso, id_funcionario);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(compromisso.getId_compromisso()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@PutMapping("/funcionario/compromisso/{id_compromissso}/{id_funcionario}")
	public ResponseEntity<Compromisso> editarCompromisso(@RequestBody Compromisso compromisso,@PathVariable Integer id_compromisso,@PathVariable Integer id_funcionario){
		compromissoService.editarCompromissso(compromisso, id_compromisso, id_funcionario);
		return ResponseEntity.noContent().build();	
	}
	
	@PutMapping("/concluir-compromisso/{id_compromisso}")
	public ResponseEntity<Compromisso> concluirCompromisso(@PathVariable Integer id_compromisso){
		compromissoService.concluirCompromisso(id_compromisso);
		return ResponseEntity.noContent().build();
	}
	@PutMapping("/cancelar-compromisso/{id_compromisso}")
	public ResponseEntity<Compromisso> cancelarCompromisso(@PathVariable Integer id_compromisso){
		compromissoService.cancelarCompromisso(id_compromisso);
		return ResponseEntity.noContent().build();
	}
}
