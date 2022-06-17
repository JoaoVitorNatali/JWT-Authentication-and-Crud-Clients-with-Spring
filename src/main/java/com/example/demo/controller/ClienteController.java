package com.example.demo.controller;

import com.example.demo.Validations.ClienteDto;
import com.example.demo.model.Cliente;
import com.example.demo.service.ClienteService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api/clientes")
public class ClienteController {
    private ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public List<Cliente> listar(
            @RequestParam(name="nome", required = false) String nome,
            @RequestParam(name="email", required = false) String email,
            @RequestParam(name="cpf", required = false) String cpf
    ){
        if(nome == null) nome = "";
        if(email == null) email = "";
        if(cpf == null) cpf = "";

        return clienteService.listar(nome, email, cpf);
    }

    @GetMapping(path = "{clienteId}")
    public Cliente get(@PathVariable("clienteId") Long id){
        return clienteService.get(id);
    }

    @PostMapping
    public ResponseEntity<Object> createCliente(@RequestBody @Valid ClienteDto clienteDto){
        Cliente cliente = new Cliente();
        BeanUtils.copyProperties(clienteDto, cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.save(cliente));
    }

    @PutMapping(path = "{clienteId}")
    public ResponseEntity<Object> updateCliente(
            @PathVariable("clienteId") Long id,
            @RequestBody @Valid ClienteDto clienteDto
    ){
        Cliente cliente = new Cliente();
        BeanUtils.copyProperties(clienteDto, cliente);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(clienteService.update(id, cliente));
    }

    @DeleteMapping(path = "{clienteId}")
    public void deleteCliente(@PathVariable("clienteId") Long id){
        clienteService.delete(id);
    }
}
