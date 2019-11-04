package ir.mb.demo.security.repository;

import ir.mb.demo.security.entity.Role;
import ir.mb.demo.security.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long>, JpaSpecificationExecutor<UserEntity> {
    Role findByName(String name);
}
