package com.example.demo.comum;

import org.springframework.http.HttpStatus;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ApiError {
    private String message;
    private Map<String, String> errors = new HashMap<>();

    public ApiError(String message, Map<String, String> errors) {
        super();
        this.message = message;
        this.errors = errors;
    }

    public String getMessage() {
        return message;
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}
