package com.example.demo.service;

import com.example.demo.model.Usuario;
import com.example.demo.repositories.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Object salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> getUser(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }
}
