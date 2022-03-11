package soulcode.empresa.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Endereco {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_endereco;
	
	@Column(nullable = false, length = 200)
	private String end_cep;
	
	@Column(nullable = false, length = 200)
	private String end_cidade;
	
	@Column(nullable = false, length = 200)
	private String end_rua;
	
	@Column(nullable = false, length = 200)
	private String end_estado;
	
	@OneToOne
	@JoinColumn(name = "id_funcionario", unique=true)// atribui o valor da chave primária da turma ao "id_turma"// chave estrangeira 
	@JsonIgnore
	private Funcionario funcionario;

	public Integer getId_endereco() {
		return id_endereco;
	}

	public void setId_endereco(Integer id_endereco) {
		this.id_endereco = id_endereco;
	}

	public String getEnd_cep() {
		return end_cep;
	}

	public void setEnd_cep(String end_cep) {
		this.end_cep = end_cep;
	}

	public String getEnd_cidade() {
		return end_cidade;
	}

	public void setEnd_cidade(String end_cidade) {
		this.end_cidade = end_cidade;
	}

	public String getEnd_rua() {
		return end_rua;
	}

	public void setEnd_rua(String end_rua) {
		this.end_rua = end_rua;
	}

	public String getEnd_estado() {
		return end_estado;
	}

	public void setEnd_estado(String end_estado) {
		this.end_estado = end_estado;
	}

	public Funcionario getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}

}
