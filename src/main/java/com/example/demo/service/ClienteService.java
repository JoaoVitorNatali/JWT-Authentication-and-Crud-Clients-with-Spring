package com.example.demo.service;

import com.example.demo.model.Cliente;
import com.example.demo.repositories.ClienteRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {
    private ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> listar(String nome, String email, String cpf) {
        return clienteRepository.findByNomeContainsAndCpfContainsAndEmailContains(nome, cpf, email);
    }

    public Object save(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Object update(Long id, Cliente clienteDto) {
        Cliente clienteFind = clienteRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "Cliente não encontrado"
                ));

        Cliente clienteUpdate = new Cliente();
        BeanUtils.copyProperties(clienteDto, clienteUpdate);
        clienteUpdate.setId(clienteFind.getId());

        return ResponseEntity.status(HttpStatus.OK).body(save(clienteUpdate));
    }

    public Cliente get(Long id) {
        return clienteRepository.findById(id).orElseThrow(()-> new IllegalStateException(
                "Cliente não encontrado"
        ));
    }

    public void delete(Long id) {
        Cliente clienteFind = clienteRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "Cliente não encontrado"
                ));

        clienteRepository.deleteById(id);
    }
}
