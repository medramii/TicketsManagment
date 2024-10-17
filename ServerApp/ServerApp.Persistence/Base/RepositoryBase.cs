
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using ServerApp.Contracts.Repositories;
using ServerApp.Domain.Data;
using System.Linq.Expressions;

namespace ServerApp.Persistence.Base;
public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
{
    protected AppDbContext _appDbContext { get; set; }

    public RepositoryBase(AppDbContext context)
    {
        _appDbContext = context;
    }

    public async Task<List<T>> GetAllAsync() => await _appDbContext.Set<T>().AsNoTracking().ToListAsync();

    public async Task<T?> FindAsync(int id) => await _appDbContext.Set<T>().FindAsync(id);

    public async Task<List<T>> GetByConditionAsync(Expression<Func<T, bool>> expression, Func<IQueryable<T>, IQueryable<T>>? includeProperties = null)
    {
        IQueryable<T> query = _appDbContext.Set<T>().Where(expression).AsNoTracking();

        if (includeProperties != null)
        {
            query = includeProperties(query);
        }

        return await query.ToListAsync();
    }

    public async Task CreateAsync(T entity)
    {
        await _appDbContext.Set<T>().AddAsync(entity); 
    }

    public async Task UpdateAsync(T entity)
    {
        _appDbContext.Set<T>().Update(entity);
        await Task.CompletedTask;
    }

    public async Task DeleteAsync(T entity)
    {
        _appDbContext.Set<T>().Remove(entity);
        await Task.CompletedTask;
    }

    public async Task<bool> Exists(int id)
    {
        return await FindAsync(id) != null;
    }

    public async Task SaveAsync() => await _appDbContext.SaveChangesAsync();
}