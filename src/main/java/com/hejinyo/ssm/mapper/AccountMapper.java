package com.hejinyo.ssm.mapper;

import com.hejinyo.ssm.model.Account;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountMapper {
    /**
     * 返回Account 所有的记录
     * @return List<Accounts>
     */
    public List<Account> getAllAccounts(Account account);
    public List<Account> getTest(String account);
}
