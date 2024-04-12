using Clicker_Back_.Data;
using Clicker_Back_.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Clicker_Back_.Controllers;

[ApiController]
[Route("api")]
public class ClickerController : ControllerBase
{
    //instanciando o Banco de Dados
    private readonly dbContext _ctx;
    public ClickerController(dbContext ctx)
    {
        _ctx = ctx;
    }

    //Metodo Salvar Batata
    [HttpPost("salvarbatata/{id}")]
    public async Task<IActionResult> SalvarBatata([FromRoute] int id, [FromBody] Batata batata){

        var BatataExistente = await _ctx.Batatas.FindAsync(id);

        if(BatataExistente == null){
            return NotFound();
        }
        
        BatataExistente.qtdBatata = batata.qtdBatata;

        _ctx.Entry(BatataExistente).State = EntityState.Modified;

        //Salvar as alterações
        await _ctx.SaveChangesAsync();

        return Ok(batata.qtdBatata);
    }

    //Metodo Salvar Upgrad
    [HttpPost("salvarupgrade/{id}")]
    public async Task<IActionResult> SalvarUpgrade([FromRoute] int id, [FromBody] Upgrade upgrade){

        //Alterando dados dos Upgrades

        var UpgradeExistente = await _ctx.Upgrades.FindAsync(id);

        if(UpgradeExistente == null){
            return NotFound();
        }

        UpgradeExistente.qtdFazendeiro = upgrade.qtdFazendeiro;
        UpgradeExistente.qtdColheitadeira = upgrade.qtdColheitadeira;

        _ctx.Entry(UpgradeExistente).State = EntityState.Modified;

        //Salvar as alterações
        await _ctx.SaveChangesAsync();

        return Ok(upgrade);
    }

    //Metodo que vai enviar os dados das Batatas para o front
    [HttpGet("envbatata")]
    public IEnumerable<Batata> EnviarBatata(){
        return _ctx.Batatas;
    }

    //Metodo que vai enviar os dados dos Upgrades para o front
    [HttpGet("envupgrade")]
    public IEnumerable<Upgrade> EnviarUpgrade(){
        return _ctx.Upgrades;
    }


}
