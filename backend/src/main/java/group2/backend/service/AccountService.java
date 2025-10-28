package group2.backend.service;

import group2.backend.model.Account;
import group2.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService implements IAccountService{
    @Autowired
    private AccountRepository repository;

    public List<Account> getAccounts() {
        return (List<Account>) repository.findAll();
    }

    public Account getAccount(long id) {
        Optional optional=repository.findById(id);
        if (optional.isEmpty()) {
            return null;
        }
        else {
            return (Account) optional.get();
        }
    }

    public Account addAccount(Account account) {
        return repository.save(account);
    }

    public Account updateAccount(long id, Account account) {
        Optional<Account> current_data = repository.findById(id);

        if (current_data.isPresent()) {
            Account current_account = current_data.get();

            // overwrite data except id
            current_account.setName(account.getName());
            current_account.setEmail(account.getEmail());
            current_account.setRole(account.getRole());
            current_account.setPassword(account.getPassword());

            return repository.save(current_account);
        }
        else {
            return null;
        }
    }

    public void deleteAccount(long id) {
        Optional<Account> account = repository.findById(id);
        if (account.isPresent()) {
            repository.delete(account.get());
        }

    }


}
