package group2.backend.service;

import group2.backend.model.Account;

import java.util.List;

public interface IAccountService {
    List<Account> getAccounts();
    Account getAccount(long id);
    Account addAccount(Account account);
    Account updateAccount(long id, Account account);
    void deleteAccount(long id);
}
