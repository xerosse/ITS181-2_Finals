package group2.backend.controller;

import group2.backend.dto.LoginRequest;
import group2.backend.dto.LoginResponse;
import group2.backend.model.Account;
import group2.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class AuthController {

    public static final String SESSION_USER_ID = "userId";
    public static final String SESSION_ROLE = "role";

    @Autowired
    private AccountRepository accountRepository;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req, HttpServletRequest request) {
        if (req.getEmail() == null || req.getPassword() == null) {
            return new LoginResponse(false, "Email and password required");
        }

        Optional<Account> opt = accountRepository.findByEmail(req.getEmail());
        if (opt.isEmpty()) {
            return new LoginResponse(false, "Invalid credentials");
        }

        Account account = opt.get();

        // NOTE: This example compares plaintext passwords. Replace with BCrypt in production.
        if (!account.getPassword().equals(req.getPassword())) {
            return new LoginResponse(false, "Invalid credentials");
        }

        HttpSession session = request.getSession(true);
        session.setAttribute(SESSION_USER_ID, account.getId());
        session.setAttribute(SESSION_ROLE, account.getRole().name());

        LoginResponse resp = new LoginResponse(true, "Login successful");
        resp.setId(account.getId());
        resp.setName(account.getName());
        resp.setEmail(account.getEmail());
        resp.setRole(account.getRole().name());
        return resp;
    }

    @PostMapping("/logout")
    public LoginResponse logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return new LoginResponse(true, "Logged out");
    }

    @GetMapping("/current-user")
    public LoginResponse currentUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return new LoginResponse(false, "Not logged in");
        }
        Object userId = session.getAttribute(SESSION_USER_ID);
        Object role = session.getAttribute(SESSION_ROLE);
        if (userId == null || role == null) {
            return new LoginResponse(false, "Not logged in");
        }

        Optional<Account> opt = accountRepository.findById(((Number)userId).longValue());
        if (opt.isEmpty()) {
            return new LoginResponse(false, "User not found");
        }
        Account account = opt.get();
        LoginResponse resp = new LoginResponse(true, "OK");
        resp.setId(account.getId());
        resp.setName(account.getName());
        resp.setEmail(account.getEmail());
        resp.setRole(account.getRole().name());
        return resp;
    }
}