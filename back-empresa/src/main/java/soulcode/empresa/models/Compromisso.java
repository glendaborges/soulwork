package soulcode.empresa.models;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Compromisso {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_compromisso;
	
	@Column(nullable = false)
	private String con_nome;
	
	@Column(nullable = false)
	private String con_localizacao;
	
	
	@DateTimeFormat(pattern="dd-MM-yyyy")
	@Column(columnDefinition = "date", nullable = false)
//	@Temporal(TemporalType.DATE)  
	private Date con_data;
	
	@Enumerated(EnumType.STRING)
	private StatusServico con_status;
	
	@ManyToOne(cascade=CascadeType.ALL) 
	@JoinColumn(name = "id_funcionario")
	@JsonIgnore
	private Funcionario funcionario;

	public Integer getId_compromisso() {
		return id_compromisso;
	}

	public void setId_compromisso(Integer id_compromisso) {
		this.id_compromisso = id_compromisso;
	}

	public String getCon_nome() {
		return con_nome;
	}

	public void setCon_nome(String con_nome) {
		this.con_nome = con_nome;
	}

	public String getCon_localizacao() {
		return con_localizacao;
	}

	public void setCon_localizacao(String con_localizacao) {
		this.con_localizacao = con_localizacao;
	}

	public Date getCon_data() {
		return con_data;
	}

	public void setCon_data(Date con_data) {
		this.con_data = con_data;
	}

	public StatusServico getCon_status() {
		return con_status;
	}

	public void setCon_status(StatusServico con_status) {
		this.con_status = con_status;
	}

	public Funcionario getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}

	
}
