package soulcode.empresa.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

//Atributos para funcionario:
//Id_funcionario
//func_nome
//func_cidade
//func_cargo

@Entity 
public class Funcionario {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id_funcionario;
	
	@Column(nullable = false)
	private String func_nome;
	
	@Column(nullable = true)
	private String func_formacao;
	
	@Column(nullable = false, length = 8)
	private String func_cpf;
	
	@Column(nullable = true) 
	private String func_img;
	
	@JsonIgnore //
	@ManyToOne
	@JoinColumn(name = "id_cargo")
	private Cargo cargo;
	
	
	@JsonIgnore
	@OneToOne
	@JoinColumn(name="id_endereco", unique =true)
	private Endereco endereco;
	
	

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public String getFunc_cpf() {
		return func_cpf;
	}

	public void setFunc_cpf(String func_cpf) {
		this.func_cpf = func_cpf;
	}

	public String getFunc_img() {
		return func_img;
	}

	public void setFunc_img(String func_img) {
		this.func_img = func_img;
	}


	public Cargo getCargo() {
		return cargo;
	}

	public void setCargo(Cargo cargo) {
		this.cargo = cargo;
	}

	public Integer getId_funcionario() {
		return id_funcionario;
	}

	public void setId_funcionario(Integer id_funcionario) {
		this.id_funcionario = id_funcionario;
	}

	public String getFunc_nome() {
		return func_nome;
	}

	public void setFunc_nome(String func_nome) {
		this.func_nome = func_nome;
	}

	public String getFunc_formacao() {
		return func_formacao; 
	}

	public void setFunc_formacao(String func_formacao) {
		this.func_formacao = func_formacao;
	}



	
	
	
	
}
