import React from 'react';

export const CreateMap = (poke, index, listType, fnDelete, fnEdit) => {
    let middleIndex = poke.moves.length % 2 === 0 ? poke.moves.length / 2 : Math.floor(poke.moves.length / 2)
    let secondMoveName = poke.moves[middleIndex].move.name;

    let buttonsHtml = listType === 'userCreated' ? (
        <tr id={poke._id}>
            <td className="text-left"> <button type="button" className="btn btn-warning" onClick={fnEdit}>edit</button> </td>
            <td className="text-right"><button type="button" className="btn btn-danger" onClick={fnDelete}>delete</button></td>
        </tr>
    ) : ''
    return (
        <div className="col-md-6" key={poke.id}>
            <div className="media">
                <div className="media-left">
                    <img src={poke.sprites.front_default} width="154px" height="128px" alt="sprite image" />
                </div>
                <div className="media-body">
                    <h3 className="media-heading">
                        <span className="text-right text-strong text-capitalize">{poke.name}</span>
                        <span className="text-right text-muted"> #{index + 1 ? index + 1 : poke.id}</span>
                    </h3>
                    <table className="table table-condensed">
                        <tbody>
                            <tr>
                                <td className="text-left">HP</td>
                                <td className="text-right">{poke.stats[5].base_stat * 10}</td>
                            </tr>
                            <tr>
                                <td className="text-left">Moves</td>
                                <td className="text-right text-capitalize">{poke.moves[0].move.name} {poke.stats[4].base_stat},  {secondMoveName} {poke.stats[2].base_stat}</td>
                            </tr>
                            <tr>
                                <td className="text-left">Stats</td>
                                <td className="text-right">SPD {poke.stats[0].base_stat} DEF {poke.stats[3].base_stat}</td>
                            </tr>
                            {buttonsHtml}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}