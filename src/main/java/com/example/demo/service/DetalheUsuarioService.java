package com.example.demo.service;

import com.example.demo.data.DetalheUsuarioData;
import com.example.demo.model.Usuario;
import com.example.demo.repositories.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DetalheUsuarioService implements UserDetailsService {
    private final UsuarioRepository usuarioRepository;

    public DetalheUsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(username);

        if(usuario.isEmpty()){
            throw new UsernameNotFoundException("Usuario não encontrado");
        }

        return new DetalheUsuarioData(usuario);
    }
}
