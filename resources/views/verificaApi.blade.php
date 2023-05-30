    <h1>Resultado para o CPF: {{$_REQUEST['cpf']}}</h1>
    @if ($apiRequest == 'CPF não encontrado.')
    <div class="btn btn-danger">Sem nenhum resultado encontrado para o CPF informado!</div>
    @else
        @foreach ($apiRequest as $key => $value)
        @foreach ($value as $chave => $valor)
        @foreach ($valor['modalidades'] as $chave2 => $valor2)
        <div class="col-4" style="float:left">
            <h3>{{$valor['nome']}}</h3>
            <div class="content">
                <p>ID: <b>{{$valor['id']}}</b><br>
                Nome: <b>{{$valor['nome']}}</b><br></p>
            </div>
        </div>
        @endforeach
        @endforeach
        @endforeach
    @endif